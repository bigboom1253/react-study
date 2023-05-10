import React, { useEffect, useRef } from 'react';
import {Radio, Button } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import './Header.css'
import { useDarkMode } from '../feat-components/todo/Providers/ThemeProvider/DarkModeContext';

const Header = ({filter, onFilterChange} ) => {

    const darkModeChangeRef = useRef(null);
    const {darkMode, toggleDarkMode} = useDarkMode();
    const onChange = (e) => {
        onFilterChange(e.target.value)
    };
    useEffect(()=>{
      if(darkMode){
        darkModeChangeRef.current.classList.add('dark')
      }else{
        darkModeChangeRef.current.classList.remove('dark')
      }
    }, [darkMode])


    return (
      <div id='header-layout' ref={darkModeChangeRef}>
          <h3 className='header-title'>Todo List</h3>
          <Button className='theme-change-btn' onClick={toggleDarkMode}><BgColorsOutlined /></Button>
          <Radio.Group
            className="filter-radio-btn"
            onChange={onChange}
            defaultValue={filter}
          >
            <Radio.Button value="all">all</Radio.Button>
            <Radio.Button value="active">active</Radio.Button>
            <Radio.Button value="completed">completed</Radio.Button>
          </Radio.Group>
      </div>
    );
};

export default Header;