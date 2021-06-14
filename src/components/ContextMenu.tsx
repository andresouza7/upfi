import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  MenuGroup,
} from '@chakra-ui/react';

import { BsThreeDotsVertical, BsPencil, BsTrashFill } from 'react-icons/bs';

interface ContextMenuProps {
  onUpdateImage: () => void;
  onDeleteImage: () => void;
}

export function ContextMenu({
  onUpdateImage,
  onDeleteImage,
}: ContextMenuProps): JSX.Element {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDotsVertical />}
        isRound
        alignSelf="center"
      />
      <MenuList>
        <MenuGroup title="Opções">
          <MenuItem icon={<BsPencil />} onClick={onUpdateImage}>
            Editar
          </MenuItem>
          <MenuItem icon={<BsTrashFill />} onClick={onDeleteImage}>
            Deletar
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
