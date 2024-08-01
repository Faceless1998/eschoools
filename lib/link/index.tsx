import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PropTypes from 'prop-types'

export { NavLink }

NavLink.propTypes = {
  exact: PropTypes.bool,
  href: PropTypes.string.isRequired,
}

NavLink.defaultProps = {
  exact: false,
}

function NavLink({
  href,
  key,
  exact,
  children,
  className,
  defaultClassname,
}: {
  href: string
  key?: any
  exact: boolean
  children: ReactNode
  className?: string
  defaultClassname?: string
}) {
  const { pathname } = useRouter()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link href={href} key={key}>
      <a
        style={{ textDecoration: 'none' }}
        className={`${defaultClassname} ${isActive && className}`}
      >
        {children}
      </a>
    </Link>
  )
}
