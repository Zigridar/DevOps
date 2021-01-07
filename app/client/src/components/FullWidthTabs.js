import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import PropTypes from "prop-types"
import {useTheme} from "@material-ui/core/styles"
import React, {useState} from "react"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import SwipeableViews from "react-swipeable-views"

const TabPanel = (props) => {
    const { children, value, index } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

const a11yProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    }
}


/**
 * @param props.tabs is an array of simple objects
 *
 * {
 *     label: "string",
 *     content: React component
 * }
 *
 * */
const FullWidthTabs = (props) => {
    const theme = useTheme()
    const [value, setValue] = useState(0)

    const {tabs} = props

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleChangeIndex = (index) => {
        setValue(index)
    }

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {tabs.map((tab, index) => (<Tab label={tab.label} {...a11yProps(index)}/>))}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {tabs.map((item, index) => {
                    return (
                        <TabPanel value={value} index={index} dir={theme.direction}>
                            {item.content}
                        </TabPanel>
                    )
                })}
            </SwipeableViews>
        </div>
    )
}

export default FullWidthTabs