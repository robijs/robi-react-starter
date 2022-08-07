import classNames from 'classnames';
import './AppContainer.css'

export default function AppContainer({ children, isDimmed }) {
    return (
        <div className={classNames('appcontainer', {dim: isDimmed})}>
            {children}
        </div>
    );
}