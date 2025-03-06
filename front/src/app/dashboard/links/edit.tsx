'use client';
import useApi from "@/app/api/hook/axiosRequest";
import { Button, Divider, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "./edit.module.css";
import { Bounce, toast } from 'react-toastify';
import { FaRegTrashAlt } from "react-icons/fa";

export default function LinksEdit({session}: any) {
    const [image, setImage] = useState<any>(null);
    const [preview, setPreview] = useState<any>('https://placehold.co/200x200');
    const [previewIcon, setPreviewIcon] = useState<any>('https://placehold.co/150x150');
    const [inputs, setInputs] = useState<any>([]);
    const [linkBtns, setLinkBtns] = useState<any>([]);
    const [populatedData, setPopulatedData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const notify = () => toast.success('Sucesso', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });

    const notifyErr = () => toast.error('Erro', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });

    useEffect(() => {
        useApi.axiosRequestAuth('GET', '/developer', null, session?.user?.accessToken).then((res: any) => {
            setPreview(process.env.NEXT_PUBLIC_API_ROUTE_BACK + res?.response?.data?.file?.path);
            setLinkBtns(res?.response?.data?.links);
            setInputs(JSON.parse(res?.response?.data?.description));
            setPopulatedData(res?.response?.data)
        });
    }, [])

    function handleChangeImage(e: any){
        setImage(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    function removeBtn(index: number) {
        let arr = linkBtns;

        arr.splice(index, 1);

        setLinkBtns([...arr]);
    }

    function handleAddTextBtn(e: any, index: number) {
        let text = e.target.value;
        const updatedInputs = [...linkBtns];
        updatedInputs[index] = {
            title: text,
            url: updatedInputs[index].url,
            file: updatedInputs[index].file
        };

        setLinkBtns(updatedInputs);
    }

    function handleAddLinkBtn(e: any, index: number) {
        let text = e.target.value;
        const updatedInputs = [...linkBtns];
        updatedInputs[index] = {
            title: updatedInputs[index].title,
            url: text,
            file: updatedInputs[index].file
        };

        setLinkBtns(updatedInputs);
    }

    function handleChangeIcon(e: any, index: number) {
        const file = e.target.files[0];
    
        const updatedInputs = [...linkBtns];
        updatedInputs[index] = {
            title: updatedInputs[index].title,
            url: updatedInputs[index].url,
            file: file
        };

        setLinkBtns(updatedInputs);
    }

    function handleChangeInputDescription(e: any, index: number) {
        const updatedInputs = [...inputs];
        updatedInputs[index] = e.target.value;
        setInputs(updatedInputs);
    }

    async function saveBtns() {
        setLoading(true)

        for(let i=0; i<linkBtns.length; i++){
            let link: any = linkBtns[i];
            let formData = new FormData();

            if(link.title) formData.append(`title`, link.title);
            if(link.url) formData.append(`url`, link.url);
            if(link.file) formData.append(`file`, link.file);
            
            const response: any = await useApi.axiosRequestAuthFormData('POST', '/developer/create-link', formData, session?.user?.accessToken)
            if(response.response.status !== 200){
                notifyErr();
                break;
            }
        }

        setLoading(false)
        notify();
    }

    async function handleSaveDeveloperInfo() {
        setLoading(true)
        let formData = new FormData();

        if(image){
            formData.append('file', image);
        }

        inputs?.map((description: any, index: number) => {
            formData.append(`description[]`, description);
        });

        await useApi.axiosRequestAuthFormData('POST', '/developer/create', formData, session?.user?.accessToken)
        .then((res: any) => {
            setLoading(false)
            notify();
        })
    }

    function handleRemoveInput(index: number) {
        let arr = inputs;

        arr.splice(index, 1);

        setInputs([...arr]);
    }

    return(
        <div className="wrapp-container">
            <div className="container">
                <h1>Imagem de perfil</h1>
                <Divider style={{marginBottom: '15px'}}/>
                <div className={styles.file_wrapp}>
                    <div className={styles.image_preview}>
                        <img src={preview} alt="" />
                    </div>
                    <label htmlFor="file">
                        <span>Escolher arquivo</span>
                        <input type="file" name="file" id="file" onChange={handleChangeImage}/>
                    </label>
                </div>
                <h1>Descrição</h1>
                <Divider style={{marginBottom: '15px'}}/>
                <div className={styles.wrapp}>
                    <span>Adicionar input</span>
                    <Button backgroundColor={"#b900ff"} color={"#fff"} onClick={() => setInputs([...inputs, ''])}>+</Button>
                </div>
                <div className={styles.input_wrapp}>
                {
                    inputs?.map((input: any, index: number) => (
                        <div className={styles.wrapp_description}>
                            <Input type="text" key={index} placeholder="Item" value={input} onChange={(e) => handleChangeInputDescription(e, index)}/>
                            <div onClick={() => handleRemoveInput(index)} className={styles.remove_input}>
                                <FaRegTrashAlt />
                            </div>
                        </div>
                    ))
                }
                </div>
                <Button 
                    backgroundColor={"#b900ff"} 
                    style={{marginTop: '20px'}} 
                    color={"#fff"} 
                    isLoading={loading}
                    onClick={handleSaveDeveloperInfo}>Salvar</Button>
            </div>
            <div className="container">
                <h1>Links</h1>
                <Divider style={{marginBottom: '15px'}}/>
                <div className={styles.wrapp}>
                    <span>Adicionar botão</span>
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
                                    <img src={btn?.file instanceof File ? URL.createObjectURL(btn?.file) : process.env.NEXT_PUBLIC_API_ROUTE_BACK + btn?.file?.path } alt="" />
                                </div>
                                <Button backgroundColor={"#b900ff"} color={"#fff"} onClick={() => removeBtn(index)}>Remover</Button>
                            </div>
                            <div className={styles.wrapp_inputs}>
                                <Input type="text" placeholder="Texto do botão" value={btn?.title} onChange={(e) => handleAddTextBtn(e, index)} />
                                <Input type="text" placeholder="Link do botão" value={btn?.url} onChange={(e) => handleAddLinkBtn(e, index)} />
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