'use client';
import { Divider } from "@chakra-ui/react";
import styles from "./page.module.css";
import AreaChartComponent from "@/components/areaChart/areaChart";
import { useEffect, useState } from "react";
import useApi from "../api/hook/axiosRequest";

export default function DashboardPageEdit({session}: any) {
    const [userAccess, setUserAccess] = useState<any>();

    useEffect(() => {
        useApi.axiosRequestAuth('GET', '/developer/visits', null, session?.user?.accessToken).then((res: any) => {
            setUserAccess(res?.response?.data);
        });
    }, [])

    return(
        <div className="wrapp-container">
            <div className="container">
                <h1>Dashboard</h1>
                <Divider style={{marginBottom: '15px'}}/>
                <h1 style={{marginBottom: '10px'}}>Acessos de usuários ao site</h1>
                <div className={styles.stats_content}>
                    <div className={styles.stat}>
                        <AreaChartComponent data={userAccess?.visits}/>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.stat_container}>
                            <span>E-mails disparados</span>
                            <h3>{userAccess?.emails}</h3>
                            <Divider style={{marginBottom: '15px'}}/>
                            <span>E-mails respondidos</span>
                            <h3>{userAccess?.answer_emails}</h3>
                            <Divider style={{marginBottom: '15px'}}/>
                            <span>Acessos de Ip's diferentes</span>
                            <h3>{userAccess?.diff_ips}</h3>
                        </div>
                    </div>
                </div>
                <h1>Regiões acessadas</h1>             
                <Divider style={{marginBottom: '15px'}}/>
                <div className={styles.regions_content}>
                    <div className={styles.region_stat}>
                        <h1>País</h1>
                        <Divider style={{marginBottom: '15px'}}/>
                        <div className={styles.container_scroll}>
                            {
                                userAccess?.country?.map((country: any) => (
                                    <span>{country}</span>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.region_stat}>
                        <h1>Estado</h1>
                        <Divider style={{marginBottom: '15px'}}/>
                        <div className={styles.container_scroll}>
                            {
                                userAccess?.region?.map((region: any) => (
                                    <span>{region}</span>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.region_stat}>
                        <h1>Cidade</h1>
                        <Divider style={{marginBottom: '15px'}}/>
                        <div className={styles.container_scroll}>
                            {
                                userAccess?.city?.map((city: any) => (
                                    <span>{city}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}