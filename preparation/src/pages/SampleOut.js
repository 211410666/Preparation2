import React, { useState, useEffect, useContext } from "react";
import { tests } from "../datas/tests";
import { weights } from "../datas/weights";
import { operator } from "../datas/operator";
import {supabase} from "../database/clientDB"
let allDeleteBtn;
let sqcount = 0;

const SampleOut = () => {
    console.log(supabase);
    const [reports, setReports] = useState([]);
    useEffect(() => {
        sqcount = 0;
        const input_list = document.querySelector('#Sample_List');
        const TotalSQ = document.querySelector('#TotalSQ');
        input_list.innerHTML = reports.map((report, index) => {
            sqcount+=Number(report.Amount);
            return (
                `
                <section class="simple_report">
                <h4>${report.reportNumber}</h4>
                <h4>${report.category}</h4>
                <h4>${report.weight}</h4>
                <h4>${report.Amount}</h4>
                <button class="deleteBtn" id=${"deleteBtn" + index}><i class="fa-regular fa-trash-can"></i></button>
                </section>`)
        }).join('');
        TotalSQ.textContent = "TotalSQ:"+sqcount;
        allDeleteBtn = document.querySelectorAll(".deleteBtn");
        allDeleteBtn.forEach((deleteBtn) => deleteBtn.addEventListener('click', (event) => {
            deleteList(event.target.id.substring(9, event.target.id.length))
        }))
    }, [reports]);
    const inputDataToSupabase = async()=>{
        try{
            
            var today = new Date();
            const operator = document.querySelector('#Operator');
            reports.forEach(async(report)=>{
                const{reportNumber,category,weight,Amount} = report;
                console.log(reportNumber,category,weight,Amount,today.toLocaleString(),operator.value);
                let {data,error} = await supabase
                .from('samplereport')
                .insert([
                    {
                        reportnumber:reportNumber,
                        category:category,
                        weight_name:weight,
                        amount:Amount,
                        user_name:operator.value,
                        recorddate:today.toLocaleString()
                    }
                ])
                .select()
            });
            
        }catch(e){
            console.log(e);
        }
    }
    const changeWeight = (filt) => {
        const temp_weight = document.querySelector('#user_weight');
        temp_weight.innerHTML = weights.map((weight) => {
            if (weight.category === filt) return (`<option>${weight.name}</option>`);
        }).join('');

    }
    const insertReport = () => {
        let reportNumber = document.querySelector('#user_reportNumber').value;
        reportNumber = reportNumber.substring(0,11);
        const reportCategory = document.querySelector('#user_category').value;
        const reportWeight = document.querySelector('#user_weight').value;
        let reportAmount = document.querySelector('#user_amount').value;
        if (reportCategory === "支援" || reportCategory === "電子組") reportAmount = 0;
        const temp_report =
        {
            reportNumber: reportNumber,
            category: reportCategory,
            weight: reportWeight,
            Amount: reportAmount
        }
        setReports([...reports, temp_report]);
        document.querySelector('#user_reportNumber').value = "";
    }
    const clearList = () => {
        setReports([]);
    }
    const deleteList = (id) => {
        console.log(id);
        const newList = reports.filter((report, index) => index != id);
        setReports(newList);
    }
    sqcount = 0;
    return (
        <div className="Sample_Form">
            <section className="Sample_Header">
                <article className="Sample_title"><h3>SampleOut</h3></article>
                <article className="List_Clear">
                    <select className="Operator" id="Operator">{operator.map((opt) => { return (<option>{opt.opt_name}</option>) })}</select>
                    <button className="btn" onClick={() => clearList()}>清空表單</button>
                </article>
            </section>
            <section className="UnderLine"></section>
            <section className="Sample_Input">
                <section className="Sample_Input_title">
                    <article className="Sample_title"><h4>ReportNumber:</h4></article>
                    <article className="Sample_title"><h4>Category:</h4></article>
                    <article className="Sample_title"><h4>Weight:</h4></article>
                    <article className="Sample_title"><h4>Amount:</h4></article>
                    <article className="Sample_title"><h4></h4></article>
                </section>
                <section className="Report_Input Sample_Input_title">
                    <article className="Report_Number"><input id="user_reportNumber" onKeyDown={(event) => { if (event.key === 'Enter') insertReport() }}></input></article>
                    <article className="Report_Category"><select id="user_category" onChange={(event) => { changeWeight(event.target.value) }}>{tests.map((test) => { return (<option>{test.test_name}</option>) })}</select></article>
                    <article className="Report_Weight"><select id="user_weight">{weights.map((weight) => {
                        if (weight.category === "材質") return (<option>{weight.name}</option>);
                    })}</select></article>
                    <article className="Report_Amount"><input id="user_amount" type="number" defaultValue={1}></input></article>
                    <article className="Delete_btn"></article>
                </section>

            </section>
            <section className="UnderLine"></section>
            <section className="Sample_List" id="Sample_List"></section>
            <section className="SampleTail">
                <section className="UnderLine"></section>
                <section className="TailStatus">
                    <h4 id="TotalSQ">TotalSQ:</h4>
                    <button className="btn" onClick={(e)=>{inputDataToSupabase();clearList();}}>送出</button>
                </section>
            </section>
        </div>
    );
}
export default SampleOut;