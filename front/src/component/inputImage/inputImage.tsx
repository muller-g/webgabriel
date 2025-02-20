'use client';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import styles from './inputImage.module.css';
import { RiFileUploadFill } from "react-icons/ri";
import { useEffect, useState } from 'react';

export default function InputImage({setImages}: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [imagesPrev, setImagesPrev] = useState<any>([]);
    const [previewImage, setPreviewImage] = useState<any>('');

    const handleChangeImage = (e: any) => {
        setImages(Array.from(e.target.files))
        setImagesPrev(Array.from(e.target.files))
    }

    const handleOpenModal = (image: any) => {
        setPreviewImage(image)
        onOpen()
    }


    return(
        <>
            <div className={styles.input_image}>
                <input className={styles.input_image_input} type="file" id="file" name="file" multiple onChange={handleChangeImage} />
                <label className={styles.input_image_label} htmlFor="file"> <RiFileUploadFill /> Selecionar arquivos</label>
            </div>
            <div className={styles.show_images}>
                {
                    imagesPrev?.map((image: any) => (
                        <div className={styles.image_prev} onClick={() => handleOpenModal(image)}>
                            <img src={image ? URL.createObjectURL(image) : ''} alt="" />
                            {/* <span className={styles.input_image_name}>{image?.name}</span> */}
                        </div>
                    ))
                }
            </div>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <img src={previewImage ? URL.createObjectURL(previewImage) : ''} alt="" />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}