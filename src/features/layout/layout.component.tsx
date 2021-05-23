import { h, FunctionalComponent } from 'preact'
import { Route, Switch, Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import cn from 'classnames'

import { useAppSelector, useAppDispatch } from 'src/app/store'

import Homepage from 'src/features/homepage/homepage.component'
import Projects from 'src/features/projects/projects.component'
import Drawing from 'src/features/drawing/drawing.component'
import Writing from 'src/features/writing/writing.component'
import Resume from 'src/features/resume/resume.component'

const Layout: FunctionalComponent = () => {
    
    const pathname = useAppSelector(state => state.router.location.pathname)
    
    const dispatch = useAppDispatch()
    const navigate = (pathname: string) => dispatch(push(pathname))

    const pages: { path: string, label: string, component: FunctionalComponent }[] = [
        {
            path: '/projects',
            label: 'projects',
            component: Projects,
        },
        {
            path: '/drawing',
            label: 'drawing',
            component: Drawing,
        },
        {
            path: '/writing',
            label: 'writing',
            component: Writing,
        },
        {
            path: '/resume',
            label: 'resume',
            component: Resume,
        },
    ]

    return (
        <div>
            <nav>
                <ul>
                    <li className={'layout-title'}>
                        <a onClick={() => navigate('/')}>
                            jax reiff
                        </a>
                    </li>
                    {pages.map(({path, label, component}) => (
                        <li className={cn({'current': (pathname === path)})}>
                            <a onClick={() => navigate(path)}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <main>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    {pages.map(({path, label, component}) => (
                        <Route path={path} component={component}/>
                    ))}
                </Switch>
            </main>
        </div>
    )
}

export default Layout
