import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ModalSaveImageProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: string;
  padding?: string;
  children: ReactNode;
}

export function ModalSaveImage({
  isOpen,
  onClose,
  title,
  size = 'md',
  padding = '0',
  children,
}: ModalSaveImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size={size}>
      <ModalOverlay />
      <ModalContent bgColor="pGray.900">
        <ModalHeader fontSize="4xl">{title}</ModalHeader>

        <ModalCloseButton />

        <ModalBody px={padding}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
