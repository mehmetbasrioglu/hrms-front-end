import React from 'react'

import "./CustomNavigation.css"

import {Avatar} from "@material-ui/core"

import {AiFillMessage} from "react-icons/ai"
import { Link } from 'react-router-dom'

function NavigationBar() {
    return (
        <div>
            <nav class="navbar navbar-expand-md navbar-light bg-white nav-shadow fixed-top">
  <div class="container-fluid container">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul class="navbar-nav me-auto navbar-links">
        <li class="nav-item active">
          <a class="nav-link logo" href="#">HRMS.NET</a>
        </li>
        <li class="nav-item">
          <Link to="/is-ilanlari" class="nav-link long" >İş Ara</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link long" href="#">Profil</a>
        </li>
        <li class="nav-item long">
          <Link to="/ozgecmis" class="nav-link ">Özgeçmiş</Link>
          <span className="yeni">Yeni</span>
        </li>
        <li class="nav-item ">
          <a class="nav-link long" href="#">Kariyer Rehberi</a>
        </li>
      </ul>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ms-auto d-flex align-items-center">
          <li className="nav-item">
              <AiFillMessage size={20} color={"#979797"}/>
              </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Mehmet Basrioğlu</a>
        </li>
        <li class="nav-item">
          <Avatar src="https://i.pinimg.com/564x/47/4c/e8/474ce8fa7b2ff9d01281048d4aca4935.jpg"/>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </div>
    )
}

export default NavigationBar
