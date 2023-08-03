import React, { ReactNode } from 'react'
import { Container} from './styles'
import {IconType} from 'react-icons'

interface TooltipProps{
    title: string
    className?: string
    children?: ReactNode;
}

const ToolTip: React.FC<TooltipProps> = ({title, className, children}  ) => {
    return (<Container className={className}>
        <>
            {children}
            <span>{title}</span>
        </>
    </Container>)
}

export default ToolTip