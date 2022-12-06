// import React, { useEffect, useState } from 'react';

import { IAnime } from '../App';

export const AnimeCard = (props: IAnime) => {
  let cardColor = 'bg-red-400';
  if (props.score >= 6.9) {
    cardColor = 'bg-yellow-400';
  }
  if (props.score >= 7.9) {
    cardColor = 'bg-green-400';
  }

  const cardClass = `flex rounded-lg ${cardColor} text-black shadow-xl `;

  const favoriteShow = () => {
    props.setFavorites([
      ...props.favorites,
      {
        image_url: props.image_url,
        title: props.title,
        score: props.score,
        episodes: props.episodes,
        synopsis: props.synopsis,
      },
    ]);
  };

  return (
    <div key={props.i} className={cardClass} onClick={favoriteShow}>
      <img src={props.image_url} alt="" className="w-36 rounded-l-lg " />
      <div className="p-4 w-full rounded-lg flex place-items-center my-2">
        <div className="flex flex-col space-y-2 ">
          <div className=" font-bold h-full flex place-items-center text-left justify-between">
            <div className="text-2xl w-64">{props.title}</div>
            <div className="border-2 border-black w-12 h-10 rounded-lg flex place-items-center ">
              <div className="text-xl text-center w-full">{Math.round(props.score * 10) / 10}</div>
            </div>
          </div>
          <div className="text-sm font-medium text-left">{props.synopsis}</div>
        </div>
      </div>
    </div>
  );
};
