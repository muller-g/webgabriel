'use client'

import useApi from '@/app/api/hook/axiosRequest';
import { signOut } from "next-auth/react";
import {
  Avatar,
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';
import {
  FiBell,
  FiChevronDown,
  FiEdit,
  FiHome,
  FiMenu
} from 'react-icons/fi';

interface LinkItemProps {
  name: string
  icon: IconType,
  path: string
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Acessos', icon: FiHome, path: '/dashboard' },
  { name: 'Links', icon: FiEdit, path: '/dashboard/links' },
  { name: 'Serviços', icon: FiEdit, path: '/dashboard/services' },
  { name: 'Skills', icon: FiEdit, path: '/dashboard/skills' },
]

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const router = useRouter()

  return (
    <Box
      transition="3s ease"
      bg={'#030018'}
      borderRight="1px"
      borderRightColor={'#953ab6'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color={'#fff'}>
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={() => router.replace(link.path)}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        color={'#fff'}
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#953ab6',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({session}: any, { onOpen, ...rest }: MobileProps) => {

  async function logout(){
    await useApi.axiosRequestAuth('POST', '/auth/logout', {}, session.user.accessToken)
    .then((res) => signOut())
  } 
  
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={'#030018'}
      borderBottomWidth="1px"
      borderBottomColor={'#953ab6'}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" 
          _hover={{
            bg: '#953ab6',
            color: 'white',
          }} aria-label="open menu" icon={<FiBell color='#fff'/>} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm" color={'#fff'}>{session?.user?.name}</Text>
                  <Text fontSize="xs" color='#fff'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown color='#fff'/>
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={'#030018'}
              borderColor={'#953ab6'}>
              <MenuItem _hover={{
                  bg: '#953ab6',
                  color: 'white',
                }} backgroundColor={'#030018'} color={'#fff'}>Perfil</MenuItem>
              <MenuDivider />
              <MenuItem _hover={{
                  bg: '#953ab6',
                  color: 'white',
                }} backgroundColor={'#030018'} color={'#fff'}
                onClick={logout}
                >Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const SidebarWithHeader = ({session, children}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={'#030018'}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} session={session}/>
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

export default SidebarWithHeader