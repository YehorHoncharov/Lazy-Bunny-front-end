import React, { ReactNode } from "react"

import "./AdminSearch.css"

interface IAdminSearchProps {
  placeholder?: string; // Текст плейсхолдера
  onChange?: (value: string) => void; // Обробник зміни введення
  onSearchClick?: () => void; // Обробник кліку на іконку
  className?: string; // Додаткові класи для контейнера
  inputClassName?: string; // Додаткові класи для input
  iconSrc?: string; // Шлях до іконки
  children?: ReactNode,
  place: string
}

export function AdminSearch(props: IAdminSearchProps) {
    const {
        placeholder = "Search by name or email",
        onChange,
        onSearchClick,
        className = "",
        inputClassName = "",
        iconSrc = "/static/img/Frame.svg",
        children,
    } = props

  // Обробник зміни введення
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(event.target.value);
        }
    }

  // Обробник кліку на іконку
    const handleIconClick = () => {
        if (onSearchClick) {
            onSearchClick()
        }
    }

    return (
        <div className={`admin-search ${className}`}>
            <input
                className={`admin-input ${inputClassName}`}
                type="text"
                placeholder={placeholder}
                onChange={handleInputChange}
            />
            <img
                id="admin-img-search"
                src={iconSrc}
                alt="Search icon"
                onClick={handleIconClick}
                style={{ cursor: "pointer" }}
            />
            {children}
        </div>
    )
}