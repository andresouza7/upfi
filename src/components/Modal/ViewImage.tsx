import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  const [isWidthGreater, setIsWidthGreater] = useState(true);
  const [shoudAdjustView, setShouldAdjustView] = useState(false);

  function handleImageSize(
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void {
    const img = e?.currentTarget;
    if (!img) return;

    setShouldAdjustView(img.width > 900 || img.height > 600);
    setIsWidthGreater(img.width > img.height);
  }

  const imgViewStyle =
    shoudAdjustView && isWidthGreater ? { maxW: '900px' } : { maxH: '600px' };

  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderTopRadius="md" {...imgViewStyle}>
        <ModalBody p="0">
          <Image src={imgUrl} onLoad={handleImageSize} fit="cover" />
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="space-between"
          bg="pGray.800"
          borderBottomRadius="base"
        >
          <Link href={imgUrl} target="blank">
            Abrir original
          </Link>
          <Button onClick={onClose} size="sm">
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
