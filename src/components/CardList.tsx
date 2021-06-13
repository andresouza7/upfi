import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards?: Card[];
}

export function CardList({ cards = [] }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [url, setUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(imgUrl: string): void {
    setUrl(imgUrl);
    onOpen();
  }

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={[1, 2, 2, 3]} gap="40px">
        {cards
          // .sort((a, b) => (a.ts < b.ts ? 1 : -1))
          .map(card => (
            <Card
              key={card.id}
              data={card}
              viewImage={() => handleViewImage(card.url)}
            />
          ))}
      </SimpleGrid>
      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={url} />
    </>
  );
}
