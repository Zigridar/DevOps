import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage"
import Dashboard from "./components/Dashboard"
import {BarChart, Subtitles, SupervisorAccount, BugReport, SettingsInputAntenna} from "@material-ui/icons"
import AdminPage from "./pages/AdminPage"


/** Test data for Dashboard **/
const testData = [
    {
        // eslint-disable-next-line
        tabContent: (<div>//TODO TEST PAGE</div>),
        itemText: 'Тесты',
        icon: (<BugReport/>),
        rendered: () => true //todo access
    },
    {
        // eslint-disable-next-line
        tabContent: (<div>//TODO RESULTS PAGE</div>),
        itemText: 'Результаты',
        icon: (<Subtitles/>),
        rendered: () => true //todo access
    },
    {
        // eslint-disable-next-line
        tabContent: (<div>//TODO ANALYTIC PAGE</div>),
        itemText: 'Аналитика',
        icon: (<BarChart/>),
        rendered: () => true //TODO access
    },
    {
        tabContent: (<AdminPage />),
        itemText: 'Управление',
        icon: (<SupervisorAccount/>),
        rendered: () => true //TODO access
    }
].filter(item => item.rendered())

//todo new context and hook that provides user access and cached in browser storage

/** routs switcher **/
export const useRouts = (isAuthenticated, logout) => {
    if (isAuthenticated)
        return(
            <Switch>
                <Route path="/dashboard" >
                    <Dashboard
                        dataSet={testData}
                        logout={logout}
                        title={'Тестирование модулей LoRaWAN'}
                        logoIcon={<SettingsInputAntenna/>}
                    />
                </Route>
                <Redirect to="/dashboard" />
            </Switch>
        )
    else
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
}