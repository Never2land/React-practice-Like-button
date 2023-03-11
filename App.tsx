import * as React from 'react';
import './style.css';
import { HeartIcon, SpinnerIcon } from './icons';
import { useRef, useEffect, useState } from 'react';

function classNames(...args) {
  return args.filter(Boolean).join(' ');
}

export default function App() {
  const [liked, setLiked] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const likeAction = async () => {
    setIsPending(true);
    setErrorMessage(null);

    fetch('https://www.greatfrontend.com/api/questions/like-button', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: liked ? 'unlike' : 'like',
      }),
    })
      .then(() => setLiked((liked) => !liked))
      .catch((err) => setErrorMessage(err))
      .finally(() => setIsPending(false));
  };

  return (
    <div className="button-container">
      <button
        className={classNames(
          'like-button',
          liked ? 'like-button--liked' : 'like-button--default'
        )}
        disabled={isPending}
        onClick={likeAction}
      >
        {isPending ? <SpinnerIcon /> : <HeartIcon />}
        {liked ? 'Liked' : 'Like'}
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}
