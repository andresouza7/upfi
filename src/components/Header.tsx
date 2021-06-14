import { Box, Flex, Button, Image } from '@chakra-ui/react';

import { ModalSaveImage } from './Modal/SaveImage';
import { FormSaveImage } from './Form/FormSaveImage';
import { usePost } from '../contexts/PostContext';

export function Header(): JSX.Element {
  const {
    newPostModal: { isOpen, onClose, onOpen },
  } = usePost();

  return (
    <>
      <Box bgColor="pGray.800">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          maxW={1120}
          mx="auto"
          px={20}
          py={6}
        >
          <Image src="logo.svg" h={10} />
          <Button onClick={() => onOpen()}>Adicionar imagem</Button>
        </Flex>
      </Box>

      <ModalSaveImage
        isOpen={isOpen}
        onClose={onClose}
        title="Nova Imagem"
        size="xl"
        padding="8"
      >
        <FormSaveImage closeModal={onClose} />
      </ModalSaveImage>
    </>
  );
}
