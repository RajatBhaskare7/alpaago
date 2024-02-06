import React from 'react'

export default function Navbar() {
  return (
    <div>
         <nav class="navbar">
        <div class="navbar-container container-nav">
            <input type="checkbox" name="" id=""/>
            <div class="hamburger-lines">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div>
            <ul class="menu-items">
                <li><a href="#">Welcome</a></li>
                <li><a href='#'>rajat@gmail.com</a></li>
                
            </ul>
            <h1 class="logo" 
                style={{
                    color:"#000"
                }}
            >Alpaago</h1>
        </div>
    </nav>
    </div>
  )
}
