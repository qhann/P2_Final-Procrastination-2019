import React, { Component } from "react";

class Desk extends Component {
    render() {
        const { onClick, hasPlayer } = this.props;


        return (
            <div className={"desk"} onClick={onClick}>
                <div className={"player"} >{hasPlayer ? "Player" : ""}</div>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <title>bed</title>
                    <metadata id="metadata3546">image/svg+xml</metadata>
                    <filter id="shadow" height="300%" width="300%" x="-75%" y="-75%">
                        <feDropShadow dx="2" dy="2" stdDeviation="64" flood-color="#ff0000" flood-opacity="1" />
                    </filter>
                    <g className={"desk-shape"} transform="translate(0.000000,350) scale(0.0300000,-0.0300000)" fill="#666666" stroke="none">
                        <path d="M7453 10645 c-33 -7 -128 -38 -210 -68 -81 -31 -296 -109 -478 -175 -181 -66 -391 -143 -465 -170 -74 -28 -245 -91 -380 -140 -135 -50 -342 -126 -460 -170 -118 -44 -330 -123 -470 -175 -558 -208 -1211 -453 -1940 -727 -421 -159 -1244 -469 -1830 -690 -878 -331 -1071 -406 -1097 -432 -63 -61 -123 -207 -123 -298 0 -108 40 -233 96 -298 34 -40 43 -44 275 -119 l239 -77 0 -2680 c0 -2613 1 -2682 19 -2712 10 -17 34 -41 53 -52 19 -12 183 -72 363 -133 410 -139 377 -138 630 -18 97 46 192 98 212 114 72 62 67 -72 70 2043 2 1178 7 1892 13 1892 5 0 105 -36 222 -79 340 -126 923 -333 1636 -582 61 -21 163 -57 225 -78 170 -60 863 -302 1029 -361 l148 -52 0 -2065 c0 -1877 1 -2068 16 -2099 26 -54 104 -85 422 -164 345 -86 373 -89 436 -61 54 24 233 144 355 239 136 106 121 -170 121 2183 l0 2036 393 219 392 219 5 -390 5 -390 25 -45 25 -45 215 -72 c247 -82 286 -87 380 -48 130 55 361 188 388 223 l27 35 6 491 c4 270 7 572 8 671 l1 180 198 114 c238 138 581 346 1077 654 641 399 1337 817 1359 817 3 0 6 -846 6 -1880 0 -2128 -9 -1924 86 -1966 66 -29 413 -94 504 -94 75 0 142 28 288 118 109 68 164 115 193 166 l24 41 6 1275 c3 701 10 1880 14 2620 l8 1346 248 147 c142 85 257 160 267 175 46 64 77 216 69 331 -14 199 -107 299 -327 350 -47 11 -393 79 -770 151 -377 72 -896 172 -1155 221 -258 50 -515 99 -570 109 -55 10 -314 60 -575 110 -261 50 -567 109 -680 130 -113 21 -347 66 -520 100 -558 108 -612 114 -747 85z" />
                    </g>
                </svg>
            </div>
        );
    }
}

export default Desk;
