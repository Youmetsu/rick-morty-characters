import classNames from 'classnames'
import {Status} from '../../enums/status.ts'
import './StatusComponent.css'

interface StatusComponentProps {
    status: Status
    className?: string
}

export function StatusComponent({status, className}: StatusComponentProps) {
    return (
        <div
            className={classNames('status', className, {
                'status-alive': status === Status.ALIVE,
                'status-dead': status === Status.DEAD,
                'status-unknown': status === Status.UNKNOWN,
            })}
        />
    )
}
