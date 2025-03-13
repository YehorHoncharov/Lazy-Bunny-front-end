import {createRoot} from 'react-dom/client'
import { MovieApp } from './shared/MovieApp/MovieApp';



const rootElement = document.getElementById('root') as HTMLElement
// Создаем корневой компонент с помощью функции createRoot импортированной из react-dom/client
const root = createRoot(rootElement)

root.render(<MovieApp></MovieApp>)