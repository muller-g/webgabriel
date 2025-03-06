'use client';
import { Button, Divider, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import styles from "./edit.module.css";

export default function SkillsEdit() {
    const [previewIcon, setPreviewIcon] = useState<any>('https://placehold.co/150x150');
    const [inputs, setInputs] = useState<any>([]);
    const [linkBtns, setLinkBtns] = useState<any>([]);

    function removeBtn(index: number) {
        let arr = linkBtns;

        arr.splice(index, 1);

        setLinkBtns([...arr]);
    }

    function handleAddTextBtn(e: any, index: number) {
        let text = e.target.value;
        let arr = linkBtns;

        arr[index] = {
            text: text,
            link: arr[index].link,
            img: arr[index].img
        };

        setLinkBtns(arr);
    }

    function handleAddLinkBtn(e: any, index: number) {
        let link = e.target.value;
        let arr = linkBtns;

        arr[index] = {
            link: link,
            text: arr[index].text,
            img: arr[index].img
        };

        setLinkBtns(arr);
    }

    function handleChangeIcon(e: any, index: number) {
        const file = e.target.files[0];
    
        setLinkBtns((prev: any) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                img: file,
            };
            return updated;
        });
    }

    function saveBtns() {
        console.log("hahahha logo")
    }

    return(
        <div className="wrapp-container">
            <div className="container">
                <h1>Skills</h1>
                <Divider style={{marginBottom: '15px'}}/>
                <div className={styles.wrapp}>
                    <span>Adicionar serviço</span>
                    <Button backgroundColor={"#b900ff"} color={"#fff"} onClick={() => setLinkBtns([...linkBtns, ''])}>+</Button>
                </div>
                {
                    linkBtns?.map((btn: any, index: number) => (
                        <div key={`container-${index}`}>
                            <div className={styles.file_wrapp} id={styles.wrapp_icon}>
                                <label htmlFor={`fileIcon-${index}`}>
                                    <span>Escolher ícone</span>
                                    <input type="file" name="fileIcon" id={`fileIcon-${index}`} onChange={(e) => handleChangeIcon(e, index)}/>
                                </label>
                                <div className={styles.image_preview}>
                                    <img src={btn?.img instanceof File ? URL.createObjectURL(btn?.img) : previewIcon} alt="" />
                                </div>
                                <Button backgroundColor={"#b900ff"} color={"#fff"} onClick={() => removeBtn(index)}>Remover</Button>
                            </div>
                            <div className={styles.wrapp_inputs}>
                                <Input type="text" placeholder="Título" onChange={(e) => handleAddTextBtn(e, index)} />
                                <Textarea placeholder='Descrição do serviço' onChange={(e) => handleAddLinkBtn(e, index)} />
                            </div>
                            <Divider style={{marginBottom: '15px'}}/>
                        </div>
                    ))
                }
                <Button backgroundColor={"#b900ff"} style={{marginTop: '20px'}} color={"#fff"} onClick={saveBtns}>Salvar</Button>
            </div>
        </div>
    )
}