import * as React from 'react'
import useComponentSize from '@rehooks/component-size'
import { makeStyles, createStyles } from '@material-ui/core'
import { useResizeViewPort } from './store';

const staticProps = {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'fixed',
    display: 'static',
    width: '100%',
    height: '100%',
}

const useStyles = makeStyles(({ layout }: any) =>
    createStyles({
        root: {},
        dimensions: {
            overflow: 'hidden',
            position: 'fixed',
            width: 'calc(100vw)',
            height: 'calc(100vh)',
        },
        backdrop: {
            ...staticProps,
            background: layout.backdropColor,
        } as any,
        viewport: (props: any) => ({
            ...staticProps,
            height: props.height,
            width: props.width,
            background: layout.backgroundColor,
        }) as any,
    })
);

export default function ViewPort({ children }) {
    const ref = React.useRef(null)
    const { height, width } = useComponentSize(ref)
    const classes = useStyles({ height, width });
    const resizeViewPort = useResizeViewPort();

    React.useEffect(() => {
        resizeViewPort({ height, width })
    }, [resizeViewPort, height, width])

    return (
        <>
            <div ref={ref} className={classes.dimensions} />
            <div id='backdrop' className={classes.backdrop}>
                <div id='viewport' className={classes.viewport}>
                    {children}
                </div>
            </div>
        </>
    )
}
