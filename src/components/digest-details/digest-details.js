import React, { useEffect } from 'react';
import { Divider, Icon, IconButton, Loader, Popover, Whisper } from 'rsuite';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import './digest-details.css';

import { getStore as getDigestStore } from '../../stores/digest';

const digestStore = getDigestStore();

const DigestDetails = observer(({ active }) => {
  useEffect(() => {
    digestStore.getDigest({ digest_id: active });
  }, [active]);

  if (!digestStore.digest || digestStore.loading) return <Loader center size="lg" />;

  const { filename } = digestStore.digests[active];

  const sections = (
    <ul className="articles-list">
      {digestStore.digest.map(el => {
        const { articles } = el;

        const artList =
          articles.length !== 0 ? (
            articles.map(article => {
              const { user, collaborators, directors } = article;

              function getName({ surname, name, patronymic }) {
                return patronymic ? `${surname} ${name[0]}.${patronymic[0]}., ` : `${surname} ${name[0]}., `;
              }

              let authors = user ? getName(user) : '';

              let arr = collaborators.map(user => getName(user));
              authors += arr.length ? arr.reduce((a, b) => a + b) : '';

              arr = directors.map(user => getName(user));
              authors += arr.length ? arr.reduce((a, b) => a + b) : '';

              authors = authors.slice(0, -2);

              return (
                <div key={article.article_id} style={{ display: 'flex' }}>
                  <Whisper
                    trigger="hover"
                    enterable
                    placement="auto"
                    speaker={
                      <Popover>
                        <p className="article-description">{article.description}</p>
                      </Popover>
                    }
                  >
                    <IconButton icon={<Icon icon="align-left" />} />
                  </Whisper>
                  <p className="article-name">
                    {el.section_num}.{article.article_num} {authors} {article.name}
                  </p>
                </div>
                // <Panel
                //   key={article.article_id}
                //   header={`${el.section_num}.${article.article_id} ${authors} ${article.name}`}
                //   collapsible
                // >
                //   <p className="article-description">{article.description}</p>
                // </Panel>
                // <div key={article.article_id}>
                //   <p className="article-name">
                //     {el.section_num}.{article.article_id} {authors} {article.name}
                //   </p>
                //   <p className="article-description">{article.description}</p>
                // </div>
              );
            })
          ) : (
            <p className="articles-list-empty">???????????????? ???? ?????????????? ?????????????? ???? ????????????????????????</p>
          );

        return (
          <li key={el.digest_section_id}>
            <p className="section-name">
              {el.section_num}. {el.name}
            </p>
            {artList}
            <Divider />
          </li>
        );
      })}
    </ul>
  );

  // const { event_id, name, registration_end, start_date, end_date, about, contacts, price, program, files } = eventStore.event;

  return (
    <div>
      <Link to={`/data/digests/${filename}`} target="_blank" download>
        ???????????? ???? ??????????????
      </Link>
      {sections}
    </div>
  );
});

export default DigestDetails;
