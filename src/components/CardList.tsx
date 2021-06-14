import { SimpleGrid, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { usePost } from '../contexts/PostContext';
import { Card } from './Card';
import { FormEditImage } from './Form/FormEditImage';
import { ModalSaveImage } from './Modal/SaveImage';
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
  const toast = useToast();

  // TODO MODAL USEDISCLOSURE
  const { editPostModal, viewPostModal, handleDeletePost } = usePost();

  // TODO SELECTED IMAGE URL STATE
  const [url, setUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<Card>();

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(imgUrl: string): void {
    setUrl(imgUrl);
    viewPostModal.onOpen();
  }

  function handleCardUpdateButton(img: Card): void {
    setSelectedImage(img);
    editPostModal.onOpen();
  }

  async function handleCardDeleteButton(imageId: string): Promise<void> {
    try {
      // TODO EXECUTE ASYNC MUTATION
      await handleDeletePost(imageId);
      // TODO SHOW SUCCESS TOAST
      toast({
        title: 'Imagem deletada',
        description: 'Sua imagem foi removida com sucesso.',
      });
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        title: 'Falha na exclusão',
        description: 'Ocorreu um erro ao tentar excluir a imagem.',
      });
    }
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
              onUpdateImage={() => handleCardUpdateButton(card)}
              onDeleteImage={() => handleCardDeleteButton(card.id)}
            />
          ))}
      </SimpleGrid>
      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage
        isOpen={viewPostModal.isOpen}
        onClose={viewPostModal.onClose}
        imgUrl={url}
      />
      <ModalSaveImage
        isOpen={editPostModal.isOpen}
        onClose={editPostModal.onClose}
        title="Editar Imagem"
        size="md"
        padding="8"
      >
        <FormEditImage
          closeModal={editPostModal.onClose}
          image={selectedImage}
        />
      </ModalSaveImage>
    </>
  );
}
