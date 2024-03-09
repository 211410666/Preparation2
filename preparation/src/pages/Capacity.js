import React, { useState, useEffect, useContext } from "react";
import { tests } from "../datas/tests";
import { weights } from "../datas/weights";
import { operator } from "../datas/operator";
import { supabase } from "../database/clientDB"

let today = new Date();
const monthNameShort = today.toLocaleString('en-US', {month: 'short'});
let day = today.getDate()>9?today.getDate().toString():"0"+today.getDate().toString();
let month = (today.getMonth() + 1>9)?(today.getMonth()+1).toString():"0"+(today.getMonth()+1).toString();
let year = today.getFullYear().toString();
//let month ="02";
let defaultDate = year + "/" + month + "/" + day;
today = defaultDate;
let sumSQ = 0;
let sumScore = 0;


const Capacity = () => {

    const [reports, setReports] = useState([]);
    const [persons, setPersons] = useState([]);
    const [monthdata, setMonthdata] = useState([]);
    const [personmonthdata, setPersonmonthdata] = useState([]);
    const getData = async () => {
        try {
            let { data, error } = await supabase
                .from('samplereport')
                .select('*')
                .like('recorddate', `${today}%`)
            console.log('today',today);
            setReports(data);

        } catch (e) {
            console.log(e);
        }
    }
    const getMonthData = async () => {
        let thisMonth = year + "/" + month +"/0";
        let tempData;
        try {
            let { data, error } = await supabase
                .from('samplereport')
                .select('*')
                .like('recorddate', `${thisMonth}%`)
            tempData = data;
        }
        catch (e) {
            console.log(e);
        }
        thisMonth = year + "/" + month +"/1";
        try {
            let { data, error } = await supabase
                .from('samplereport')
                .select('*')
                .like('recorddate', `${thisMonth}%`)
            tempData = tempData.concat(data);
        }
        catch (e) {
            console.log(e);
        }
        thisMonth = year + "/" + month +"/2";
        try {
            let { data, error } = await supabase
                .from('samplereport')
                .select('*')
                .like('recorddate', `${thisMonth}%`)
            tempData = tempData.concat(data);
        }
        catch (e) {
            console.log(e);
        }
        thisMonth = year + "/" + month +"/3";
        try {
            let { data, error } = await supabase
                .from('samplereport')
                .select('*')
                .like('recorddate', `${thisMonth}%`)
            tempData = tempData.concat(data);
        }
        catch (e) {
            console.log(e);
        }
        setMonthdata(tempData);
    }
    useEffect(() => {
        getData();
        getMonthData();
    }, [])

    useEffect(() => {
        setPersonData();
    }, [reports])

    useEffect(() => {
        setPersonMonth();
    }, [monthdata])

    const setPersonMonth = () => {
        let newArray = [];
        operator.forEach((opt) => {
            let newPerson = {
                name: opt.opt_name,
                TotalSQ: 0,
                TotalScore: 0,
            }
            monthdata.forEach((report) => {
                if (report.user_name === newPerson.name) {
                    newPerson.TotalSQ += report.amount;
                    weights.forEach((w) => {
                        if (w.name === report.weight_name) {
                            sumScore += ((Number)(w.weight)*report.amount);
                            newPerson.TotalScore+=((Number)(w.weight)*report.amount);
                            return ;
                        }
                    })
                }
            })
            sumSQ += newPerson.TotalSQ;
            newArray.push(newPerson);
        })
        setPersonmonthdata(newArray);
    }

    const setPersonData = () => {
        let newArray = [];
        operator.forEach((opt) => {
            let newPerson = {
                name: opt.opt_name,
                TotalSQ: 0,
                reportnumbers: []
            }
            reports.forEach((report) => {
                if (report.user_name === newPerson.name) {
                    newPerson.TotalSQ += report.amount;
                    if (!newPerson.reportnumbers.includes(report.reportnumber)) {
                        newPerson.reportnumbers.push(report.reportnumber);
                    }
                }
            })
            newArray.push(newPerson);
        })
        setPersons(newArray);
    }

    return (
        <>
            <div className="Sample_Form">
                <article className="Sample_title"><h3>Today</h3></article>
                <section className="UnderLine"></section>
                <section className="Today_Personal_Capacity_Container">
                    {
                        persons.map((person) => {
                            if (person.TotalSQ != 0) {
                                return (
                                    <section className="Today_Personal_Capacity">
                                        <h5 className="Today_Personal_Capacity_Name">{person.name}</h5>
                                        <h4>TotalSQ : {person.TotalSQ}</h4>
                                        <section className="ReportList">
                                            {person.reportnumbers.map((rtN) => {
                                                return (<h5>{rtN}</h5>)
                                            })}
                                        </section>
                                    </section>
                                )
                            }
                        })
                    }
                </section>
            </div>
            <div className="Sample_Form">
                <article className="Sample_title"><h3>This Month ={monthNameShort}=</h3></article>
                <section className="UnderLine"></section>
                <section className="Month_Personal_Capacity_Container">
                    <section className="Month_Personal_Capacity_title left"><h4>Name</h4></section>
                    <section className="Month_Personal_Capacity_title middle"><h4>TotalSQ</h4></section>
                    <section className="Month_Personal_Capacity_title middle"><h4>Capacity(SQ)</h4></section>
                    <section className="Month_Personal_Capacity_title right"><h4>Capacity(Score)</h4></section>

                    {
                        personmonthdata.map((data) => {
                            return (
                                <>
                                    <section className="Month_Personal_Capacity_name left"><h4>{data.name}</h4></section>
                                    <section className="Month_Personal_Capacity_totalsq middle"><h4>{data.TotalSQ}</h4></section>
                                    <section className="Month_Personal_Capacity_progress_left middle">
                                        <div className="progress_bar" style={{ width: `${data.TotalSQ / sumSQ * 100 * 2}%` }}></div>
                                        <div className="progress_bar_msg"><h4>{(Number)(data.TotalSQ / sumSQ * 100).toFixed(1)}%</h4></div>
                                    </section>
                                    <section className="Month_Personal_Capacity_progress_right right">
                                        <div className="progress_bar2" style={{ width: `${data.TotalScore / sumScore * 100 * 2}%`}}></div>
                                        <div className="progress_bar_msg"><h4>{data.TotalScore}</h4></div>
                                    </section>
                                </>
                            )
                        })
                    }
                </section>
            </div>
        </>
    );
}

export default Capacity;