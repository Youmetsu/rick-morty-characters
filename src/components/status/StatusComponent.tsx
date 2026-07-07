import classNames from 'classnames'
import {Status} from '../../enums/status.ts'
import './StatusComponent.css'

interface StatusComponentProps {
    status: Status
}

export function StatusComponent({status}: StatusComponentProps) {
    return (
        <div
            className={classNames('status', {
                'status-alive': status === Status.ALIVE,
                'status-dead': status === Status.DEAD,
                'status-unknown': status === Status.UNKNOWN,
            })}
        />
    )
}
