import './AppContainer.css'

export default function AppContainer({ children }) {
    return (
        <div className="appcontainer">
            {children}
        </div>
    );
}