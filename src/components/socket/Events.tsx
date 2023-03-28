import React, { type ReactNode } from 'react';

interface EventsProps {
  events: ReactNode[]
}

export const Events: React.FC<EventsProps> = ({ events }) => {
  return (
    <ul>
    {
      events.map((event, index) =>
        <li key={ index }>{ event }</li>
      )
    }
    </ul>
  );
}