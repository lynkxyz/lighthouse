import React from 'react'
import { withContext } from '../../_API/withContext'
import {
	Container,
	Logo,
	MenuItem
} from './AppHeaderStyled'

class AppHeader extends React.PureComponent {
	render() {
		const {
			currentCreator,
			account
		} = this.props
		return (
			<Container>
				<Logo>Lighthouse</Logo>
				<MenuItem to="">Explore</MenuItem>
				{
					currentCreator ?
						<MenuItem to="/start">Start a project</MenuItem> :
						<MenuItem to="/sign-up">Become creator</MenuItem>
				}
				{/*<MenuItem to="">Search</MenuItem>*/}

				{/*<MenuItem to="" style={{marginLeft: 'auto'}}>10 Notifications</MenuItem>*/}
				<MenuItem to={`/user/${account}`} style={{marginLeft: 'auto'}}>{currentCreator.username}</MenuItem>
			</Container>
		)
	}
}

export default withContext([
	'currentCreator',
	'account'
])(AppHeader)