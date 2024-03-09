import React, { useState, useEffect, useContext } from "react";
import { tests } from "../datas/tests";
import { weights } from "../datas/weights";
import { operator } from "../datas/operator";
import { supabase } from "../database/clientDB"


const Fix = () => {
    const [reports, setReports] = useState([]);
    const getData = async () => {
        try {
            let { data, error } = await supabase
                .from('samplereport')
                .select('*')
                .gt('id',0)
                .lt('id',1000)
            console.log(data);
            setReports(data);
        } catch (e) {
            console.log(e);
        }
    }
    const updateData = async (id , date) => {
        console.log(id,date);
        const { data, error } = await supabase
            .from('samplereport')
            .update({ 'recorddate': date })
            .eq('id', id)
            .select()

    }
    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {
        reports.forEach((report) => {
            let temp = report.recorddate.split("/").join(' ').split(' ');
            if(temp[2].length === 1 || temp[1].length === 1)
            {
                if (temp[2].length === 1) {
                    temp[2] = "0" + temp[2];
                }
                if(temp[1].length === 1){
                    temp[1]="0"+temp[1];
                }
                let temp_date = temp[0]+"/"+temp[1]+"/"+temp[2]+" "+temp[3];
                updateData(report.id,temp_date);
            }
            
        })
    }, [reports]);

}

export default Fix;