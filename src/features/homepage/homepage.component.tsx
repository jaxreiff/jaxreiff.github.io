import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Image } from '~/src/common/image/image.component'
import { ABOUT_ME_IMAGE_URL, RESUME_URL, GITHUB_URL, GITHUB_SITE_PROJECT_URL } from '~/src/utilities/constants'

import styles from './homepage.module.scss'

const Homepage: FC = () => {
    return (
        <section className={styles.homepage}>
            <Image
                className={styles.image}
                aspect={900/600}
                source={ABOUT_ME_IMAGE_URL}
                alt={'Image of site author Jax Reiff.'}
            />
            <div className={styles.aboutme}>
                <header>
                    <h2>
                        About Me
                    </h2>
                </header>
                <p>
                    Hello! I am a software engineer specializing in front-end, with expertise building
                    clients using TypeScript and React, but with plenty of experience across the full stack.
                </p>
                <p>
                    This is my personal site, where I've put photos, writing, and various projects I've been
                    working on.
                </p>
                <p>
                    The site itself also serves as an example (and test environment) of some of my preferred
                    front-end technologies, libraries, and approaches. The source code for the site is
                    publically available <a href={GITHUB_SITE_PROJECT_URL}>here</a>, and links to resources
                    and libraries that I have found useful building the site can be
                    found <Link to={'/posts/portfolio-site-design'}>here</Link>.
                </p>
                <p>
                    My front-end development résumé can be found <a href={RESUME_URL}>here</a>.
                </p>
                <p>
                    My GitHub profile can be found <a href={GITHUB_URL}>here</a>.
                </p>
            </div>
        </section>
    )
}

export default Homepage
