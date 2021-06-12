import { makeAutoObservable, runInAction } from 'mobx';

import * as api from '../api';

class Event {
  _error = false;
  _loading = false;
  _events = undefined;
  _event = undefined;

  _searchParams = {
    searchText: '',
    registerEndDate: null,
    eventStartDate: null,
    eventEndDate: null,
    organizationName: '',
    sort: 'default',
  };

  set searchParams(e) {
    this._searchParams = e;
    this.getFilterEvents();
  }

  get loading() {
    return this._loading;
  }

  get events() {
    return this._events;
  }

  get event() {
    return this._event;
  }

  async getEvent(data) {
    this._loading = true;

    let res;

    try {
      res = await api.getEvent(data);
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }

    if (res.status === 200) {
      runInAction(() => {
        this._event = res.data;
      });
    } else if (res.status === 404) {
      runInAction(() => {
        this._event = [];
      });
    } else {
      runInAction(() => {
        this._error = true;
      });
    }

    runInAction(() => {
      this._loading = false;
    });
  }

  async getEvents() {
    this._loading = true;

    let res;

    try {
      res = await api.getEvents();
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }

    if (res.status === 200) {
      runInAction(() => {
        this._events = res.data.records;
      });
    } else if (res.status === 404) {
      runInAction(() => {
        this._events = [];
      });
    } else {
      runInAction(() => {
        this._error = true;
      });
    }

    runInAction(() => {
      this._loading = false;
    });
  }

  async getFilterEvents() {
    await this.getEvents();

    const sText = this._searchParams.searchText;
    if (sText !== '') {
      this._events = this._events.filter(item => {
        const evName = item.event_name.toLowerCase();
        const confName = item.conference_name.toLowerCase();
        return evName.indexOf(sText.toLowerCase()) !== -1 || confName.indexOf(sText.toLowerCase()) !== -1;
      });
    }

    const sOrg = this._searchParams.organizationName;
    if (sOrg !== '') {
      this._events = this._events.filter(item => {
        const orgName = item.organization_name.toLowerCase();
        const orgShortName = item.organization_short_name.toLowerCase();
        return orgName.indexOf(sOrg.toLowerCase()) !== -1 || orgShortName.indexOf(sOrg.toLowerCase()) !== -1;
      });
    }

    const registerEndDate = this._searchParams.registerEndDate;
    if (registerEndDate) {
      this._events = this._events.filter(item => {
        return new Date(item.registration_end) >= new Date(registerEndDate);
      });
    }

    const eventStartDate = this._searchParams.eventStartDate;
    if (eventStartDate) {
      this._events = this._events.filter(item => {
        return new Date(item.start_date) >= new Date(eventStartDate);
      });
    }

    const eventEndDate = this._searchParams.eventEndDate;
    if (eventEndDate) {
      this._events = this._events.filter(item => {
        return new Date(item.end_date) <= new Date(eventEndDate);
      });
    }

    const sort = this._searchParams.sort;
    switch (sort) {
      case 'name':
        this._events = this._events.sort((a, b) => (a.event_name > b.event_name ? 1 : -1));
        break;
      case 'registerDate':
        this._events = this._events.sort((a, b) => (new Date(a.registration_end) > new Date(b.registration_end) ? 1 : -1));
        break;
      case 'eventDate':
        this._events = this._events.sort((a, b) => (new Date(a.start_date) > new Date(b.start_date) ? 1 : -1));
        break;
      default:
        this._events = this._events.sort((a, b) => (a.conference_id > b.conference_id ? 1 : -1));
        break;
    }
  }

  // async createConference(data) {
  //   this._loading = true;

  //   try {
  //     await api.createConference(data);
  //   } catch (error) {
  //     runInAction(() => {
  //       this._loading = false;
  //       this._error = true;
  //     });
  //     return;
  //   }

  //   runInAction(() => {
  //     this._loading = false;
  //   });
  // }

  // async getConferences(data) {
  //   this._loading = true;

  //   let res;

  //   try {
  //     res = await api.getConferences(data);
  //   } catch (error) {
  //     runInAction(() => {
  //       this._loading = false;
  //       this._error = true;
  //     });
  //     return;
  //   }

  //   if (res.status === 200) {
  //     runInAction(() => {
  //       this._events = res.data.records;
  //     });
  //   } else if (res.status === 404) {
  //     runInAction(() => {
  //       this._events = [];
  //     });
  //   } else {
  //     runInAction(() => {
  //       this._error = true;
  //     });
  //   }

  //   runInAction(() => {
  //     this._loading = false;
  //   });
  // }

  constructor() {
    makeAutoObservable(this);
  }
}

let store;

export function getStore() {
  if (!store) store = new Event();

  return store;
}
