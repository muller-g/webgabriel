'use client';
import Chip from "@/components/chip";
import Service from "@/components/service";
import SocialButton from "@/components/socialButton";
import { useEffect, useState } from "react";
import { FaStoreAlt } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { GrConnect, GrVmMaintenance } from "react-icons/gr";
import { MdDevices, MdWeb } from "react-icons/md";
import github from "../assets/github.png";
import instagram from "../assets/instagram.png";
import linkedin from "../assets/linkedin.png";
import telegram from "../assets/telegram.png";
import wpp from "../assets/wpp.jpg";
import styles from "./page.module.css";

export default function PortfolioEdit({data}: any) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [descriptions, setDescriptions] = useState<any[]>([]);
    const [links, setLinks] = useState<any[]>([]);

    useEffect(() => {
        setDescriptions(JSON.parse(data?.description));
        setLinks(data?.links);
        console.log(data)
    }, [data]);

    return (
        <main className={styles.my_links} style={selectedTab === 0 ? {height: '100vh'} : {height: 'auto'}}>
           <div className={styles.my_links_container}>
                <div className={styles.fixed_section}>
                    <div className={styles.title_img} style={{backgroundImage: `url("${process.env.NEXT_PUBLIC_API_ROUTE_BACK + data?.file?.path}")`}}></div>
                    <h1 className={styles.instagram_title}>@_muller.dev</h1>
                    {
                        descriptions?.map((description: any, index: number) => (
                            <p key={index} className={styles.description}>{description}</p>
                        ))
                    }
                    <div className={styles.tab_list}>
                        <div className={`${styles.tab_info} ${selectedTab === 0 ? styles.selected_tab : ''}`} onClick={() => setSelectedTab(0)}>LINKS</div>
                        <div className={`${styles.tab_info} ${selectedTab === 1 ? styles.selected_tab : ''}`} onClick={() => setSelectedTab(1)}>SERVIÇOS</div>
                        <div className={`${styles.tab_info} ${selectedTab === 2 ? styles.selected_tab : ''}`} onClick={() => setSelectedTab(2)}>SKILLS</div>
                    </div>
                </div>
                <div className={styles.content_tab}>
                {
                    selectedTab === 0 &&
                    <div className={styles.redirect_links}>
                        {
                            links?.map((link: any, index: number) => (
                                <SocialButton text={link?.title} url={link?.url} icon={link?.file?.path} />
                            ))
                        }
                    </div>
                }
                {
                    selectedTab === 1 &&
                    <div className={styles.redirect_links}>
                        <Service title={'Sites'} text={'Desenvolvo sites personalizados para sua marca e/ou empresa'} icon={<MdWeb />}/>
                        <Service title={'E-commerces'} text={'Crio lojas virtuais para vender seus produtos online customizadas ou shopify'} icon={<FaStoreAlt />}/>
                        <Service title={'Sistemas'} text={'Construo um sistema sob medida para o seu negócio'} icon={<FaGears />}/>
                        <Service title={'Integrações'} text={'Conecto diferentes plataformas para trabalharem juntas, importando ou exportando seus dados'} icon={<GrConnect />}/>
                        <Service title={'Landing Pages'} text={'Crio páginas focada em conversão de leads'} icon={<MdDevices />}/>
                        <Service title={'Manutenção e Correções'} text={'Ofereço suporte e correção de problemas em seu sistema'} icon={<GrVmMaintenance />}/>
                    </div>
                }
                {
                    selectedTab === 2 &&
                    <div className={styles.technology}>
                        <h1>Front End</h1>
                        <div className={styles.tec_list}>
                            <Chip
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s"
                                text="ReactJS"
                            />
                            <Chip
                                img="https://www.svgrepo.com/show/354113/nextjs-icon.svg"
                                text="NextJS"
                            />
                            <Chip
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxBTJD040TLCM3QJUyXatY6_CliSbFTuWQTw&s"
                                text="VueJs"
                            />
                            <Chip
                                img="https://cdn-icons-png.flaticon.com/512/919/919827.png"
                                text="HTML"
                            />
                            <Chip
                                img="https://cdn-icons-png.flaticon.com/512/5968/5968242.png"
                                text="CSS"
                            />
                            <Chip
                                img="https://www.svgrepo.com/show/374118/tailwind.svg"
                                text="Tailwind CSS"
                            />
                            <Chip
                                img="https://miro.medium.com/v2/resize:fit:318/1*7jRD5QhgARucFKvRHFxpOg.png"
                                text="Styled Components"
                            />
                        </div>
                        <h1>Back End</h1>
                        <div className={styles.tec_list}>
                            <Chip
                                img="https://cdn-icons-png.flaticon.com/512/919/919825.png"
                                text="NodeJS"
                            />
                            <Chip
                                img="https://www.svgrepo.com/show/330398/express.svg"
                                text="Express"
                            />
                            <Chip
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgh0cmaLPqUaZd6iuo7D_iaOeLYb1QUdjMiA&s"
                                text="Javascript"
                            />
                            <Chip
                                img="https://cdn-icons-png.flaticon.com/512/5968/5968381.png"
                                text="Typescript"
                            />
                            <Chip
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXeHmYqamiKUUFZ_34jLIiyqf3BDVLN0e9Lw&s"
                                text="PHP"
                            />
                            <Chip
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWLusrEhuGwyB6Heq_sOUBnRbgXlm0iDF42A&s"
                                text="Laravel"
                            />
                            <Chip
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNOW8dJIWuL8rkIWugVrhwFzAv4YwAQHjYAg&s"
                                text="NestJS"
                            />
                            <Chip
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-G2ClmfT0_7x7jxCsEh9U9hIWFb4PJdPeYw&s"
                                text="Socket.IO"
                            />
                        </div>
                        <h1>Banco de dados</h1>
                        <div className={styles.tec_list}>
                            <Chip
                                img="https://cdn-icons-png.flaticon.com/512/919/919836.png"
                                text="MYSQL"
                            />
                            <Chip
                                img="https://cdn.icon-icons.com/icons2/2415/PNG/512/postgresql_plain_wordmark_logo_icon_146390.png"
                                text="PostgreSQL"
                            />
                            <Chip
                                img="https://www.svgrepo.com/show/331488/mongodb.svg"
                                text="MongoDB"
                            />
                        </div>
                        <h1>Devops</h1>
                        <div className={styles.tec_list}>
                            <Chip
                                img="https://cdn-icons-png.flaticon.com/512/888/888879.png"
                                text="Ubuntu"
                            />
                            <Chip
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw5-AR8zEFdITxwcsvta1oOd5jZifM4Ryjlw&s"
                                text="Nginx"
                            />
                            <Chip
                                img="https://www.iconshock.com/image/RealVista/Communications/apache_server"
                                text="Apache"
                            />
                            <Chip
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSObhWW7gEGNs1r3kbEXIeWuIDC74C6p5RVQ&s"
                                text="AWS"
                            />
                            <Chip
                                img="https://cdn-icons-png.flaticon.com/512/8047/8047704.png"
                                text="VPS"
                            />
                        </div>
                        <h1>Outras</h1>
                        <div className={styles.tec_list}>
                            <Chip
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXFno_zTio15YuAhoiqDh0y0DPMsqsZNMG4Q&s"
                                text="Docker"
                            />
                            <Chip
                                img="https://cdn.icon-icons.com/icons2/2148/PNG/512/prisma_icon_132076.png"
                                text="Prisma"
                            />
                            <Chip
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJSJmlNYGBG0wZYVdNpEFAPzVSnGM3LdOIBw&s"
                                text="Jest"
                            />
                            <Chip
                                img="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2048px-Git_icon.svg.png"
                                text="GIT"
                            />
                            <Chip
                                img="https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
                                text="Figma"
                            />
                            <Chip
                                img="https://www.svgrepo.com/show/354202/postman-icon.svg"
                                text="Postman"
                            />
                        </div>
                    </div>
                }
                </div>
            </div>
        </main>
    );
}
