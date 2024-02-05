import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../database/clientDB"
let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let defaultDate = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
today = defaultDate;
let startdefaultDate = (year - 1) + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);

const SearchReport = () => {
    const [reports, setReports] = useState([]);
    const getData = async () => {
        try {
            let { data, error } = await supabase
                .from('samplereport')
                .select('*')
            console.log(data.reverse());
            setReports(data);
        } catch (e) {
            console.log(e);
        }
    }
    const showSearch = () => {
        
        const value = document.querySelector('#user_input').value;
        const ResultsOfSearch = document.querySelector('#ResultsOfSearch');
        if (value != "") {
            ResultsOfSearch.innerHTML =`
                <section class="simple_data_title">
                <h4 class="s_form">ReportNo.</h4>
                <h4 class="s_form">Category</h4>
                <h4 class="s_form">Class</h4>
                <h4 class="s_form">SQ</h4>
                <h4 class="s_form">Owner</h4>
                <h4 class="s_form">Date</h4>
                </section>
            `; 
            let newData = reports.filter((report) => `${report.reportnumber}`.includes(value));
            ResultsOfSearch.innerHTML += newData.map((data) => {
                let temp_time = `${data.recorddate}`.split('/');
                temp_time[2] = temp_time[2].split(' ')[0];
                temp_time[1] = temp_time[1] < 10 ? "0" + temp_time[1] : temp_time[1];
                temp_time[2] = temp_time[2] < 10 ? "0" + temp_time[2] : temp_time[2];
                temp_time = temp_time[0] + '-' + temp_time[1] + '-' + temp_time[2];
                if ((temp_time.localeCompare(startdefaultDate) != -1) && (temp_time.localeCompare(defaultDate) != 1)) {
                    return (`
                    <section class="simple_data">
                    <h4 class="s_form">${data.reportnumber}</h4>
                    <h4 class="s_form">${data.category}</h4>
                    <h4 class="s_form">${data.weight_name}</h4>
                    <h4 class="s_form">${data.amount}</h4>
                    <h4 class="s_form">${data.user_name}</h4>
                    <h4 class="s_form">${data.recorddate}</h4>
                    </section>
                    `)
                };
            }).join('');
        }
        else {
            ResultsOfSearch.innerHTML =`
                <section class="simple_data_title">
                <h4 class="s_form">ReportNo.</h4>
                <h4 class="s_form">Category</h4>
                <h4 class="s_form">Class</h4>
                <h4 class="s_form">SQ</h4>
                <h4 class="s_form">Owner</h4>
                <h4 class="s_form">Date</h4>
                </section>
            `; 
            ResultsOfSearch.innerHTML += reports.map((data) => {
                let temp_time = `${data.recorddate}`.split('/');
                temp_time[2] = temp_time[2].split(' ')[0];
                temp_time[1] = temp_time[1] < 10 ? "0" + temp_time[1] : temp_time[1];
                temp_time[2] = temp_time[2] < 10 ? "0" + temp_time[2] : temp_time[2];
                temp_time = temp_time[0] + '-' + temp_time[1] + '-' + temp_time[2];
                if ((temp_time.localeCompare(startdefaultDate) != -1) && (temp_time.localeCompare(defaultDate) != 1)) {
                    return (`
                    
                    <section class="simple_data">
                    <h4 class="s_form">${data.reportnumber}</h4>
                    <h4 class="s_form">${data.category}</h4>
                    <h4 class="s_form">${data.weight_name}</h4>
                    <h4 class="s_form">${data.amount}</h4>
                    <h4 class="s_form">${data.user_name}</h4>
                    <h4 class="s_form">${data.recorddate}</h4>
                    </section>
                    `)
                };
            }).join('');
        }

    }
    const changeStartDate = (date) => {
        if (date.localeCompare(defaultDate) === 1) startdefaultDate = defaultDate;
        else startdefaultDate = date;
        document.querySelector('#start_time').value = startdefaultDate;
        showSearch();
    }
    const changeEndDate = (date) => {
        defaultDate = date;
        if (startdefaultDate.localeCompare(defaultDate) === 1) {
            startdefaultDate = defaultDate;
            document.querySelector('#start_time').value = startdefaultDate;
        }
        showSearch();
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="Sample_Form">
            <section className="Sample_Header">
                <article className="Sample_title"><h3>Search</h3></article>
            </section>
            <section className="UnderLine"></section>
            <section className="Search_Input">
                <article className="ReportNumber">
                    <h4>ReportNumber:</h4>
                    <input id="user_input" onChange={(event) => showSearch()}></input>
                </article>
                <article className="Time_Zone">
                    <h4>時間區間:</h4>
                    <input id="start_time" type="date" defaultValue={startdefaultDate} onChange={(event) => { changeStartDate(event.target.value) }}></input>
                    <h4>到</h4>
                    <input id="end_time" type="date" defaultValue={defaultDate} max={today} onChange={(event) => { changeEndDate(event.target.value) }}></input>
                </article>
            </section>
            <section className="UnderLine"></section>
            <section id="ResultsOfSearch" className="ResultsOfSearch">
                <section className="simple_data_title">
                    <h4 className="s_form">ReportNo.</h4>
                    <h4 className="s_form">Category</h4>
                    <h4 className="s_form">Class</h4>
                    <h4 className="s_form">SQ</h4>
                    <h4 className="s_form">Owner</h4>
                    <h4 className="s_form">Date</h4>
                </section>
                {
                    reports.map((data) => {
                        let temp_time = `${data.recorddate}`.split('/');
                        temp_time[2] = temp_time[2].split(' ')[0];
                        temp_time[1] = temp_time[1] < 10 ? "0" + temp_time[1] : temp_time[1];
                        temp_time[2] = temp_time[2] < 10 ? "0" + temp_time[2] : temp_time[2];
                        temp_time = temp_time[0] + '-' + temp_time[1] + '-' + temp_time[2];
                        if ((temp_time.localeCompare(startdefaultDate) != -1) && (temp_time.localeCompare(defaultDate) != 1)) {
                            return (
                                <section className="simple_data">
                                    <h4 className="s_form">{data.reportnumber}</h4>
                                    <h4 className="s_form">{data.category}</h4>
                                    <h4 className="s_form">{data.weight_name}</h4>
                                    <h4 className="s_form">{data.amount}</h4>
                                    <h4 className="s_form">{data.user_name}</h4>
                                    <h4 className="s_form">{data.recorddate}</h4>
                                </section>
                            )
                        };
                    })
                }
            </section>
        </div>

    )
}

export default SearchReport;