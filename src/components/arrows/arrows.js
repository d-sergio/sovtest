import React from "react";
import s from "./arrows.module.css";

export function ArrowLeft() {
    return(
        <div className={s.arrow__left}></div>
    )
}

export function ArrowRight() {
    return(
        <div className={s.arrow__right}></div>
    )
}

export function ArrowUp() {
    return(
        <div className={s.arrow__up}></div>
    )
}

export function ArrowDown() {
    return(
        <div className={s.arrow__down}></div>
    )
}

export function ArrowLeftSpace() {
    return(
        <div className={s.arrow_slider}>
            <div className={s.arrow__left}></div>
            <div className={s.arrow__space}></div>
        </div>
    )
}

export function ArrowRightSpace() {
    return(
        <div className={s.arrow_slider}>
            <div className={s.arrow__space}></div>
            <div className={s.arrow__right}></div>
        </div>
    )
}

export function ArrowLeftSeries() {
    return(
        <div className={s.arrow_slider}>
            <div className={[s.arrow__left, s.arrow__left_series].join(" ")}></div>
            <div className={s.arrow__space_series}></div>
        </div>
    )
}

export function ArrowRightSeries() {
    return(
        <div className={s.arrow_slider}>
            <div className={s.arrow__right_series}></div>
        </div>
    )
}