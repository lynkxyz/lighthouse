import React, { Fragment } from 'react'
import AppButton from '../_Components/AppButton/AppButton'
import { ProgressBar } from '../_Components/AppCard/AppCardStyled'
import AppInput from '../_Components/AppInput/AppInput'
import { Colors } from '../_Variables/Colors'
import {
	Avatar,
	Container,
	Description,
	GroupText,
	InfoContainer,
	Label,
	ListItem,
	ListItemContainer,
	Text,
	TextPrimary,
	Thumbnail,
	Title,
	UserInfoContainer,
	Wrapper
} from './ProjectStyled'
import moment from 'moment'

class ProjectPage extends React.PureComponent {
	static defaultProps = {
		amountRaised: 0,
		LogCrowdSaleCreatedByAddr: {
			args: {
				fundingGoalInEthers: 0
			}
		}
	}

	get getPledgedPercent() {
		const {fundingGoalInEthers} = this.props.LogCrowdSaleCreatedByAddr.args
		if (fundingGoalInEthers === 0) return 0

		return ((this.props.amountRaised / fundingGoalInEthers.toNumber()) * 100).toFixed(2)
	}

	get isDeadlineReached() {
		return moment().isAfter(this.props.crowSaleDeadline)
	}

	render() {
		// console.log(this.props.LogFundTransfer)
		const {
			title,
			description,
			fundingGoalInEthers,
			thumbnailHash,
		} = this.props.LogCrowdSaleCreatedByAddr.args
		const {creator} = this.props
		return (
			<Container>
				<Wrapper>
					{
						Object.keys(creator).length > 0 &&
						<UserInfoContainer>
							<Avatar bgImage={`https://ipfs.io/ipfs/${creator.avatarHash}`}/>
							<div>
								<p>{creator.username}</p>
								<p>{creator.email}</p>
							</div>
						</UserInfoContainer>
					}

					<Title>{title}</Title>
					{
						thumbnailHash &&
						<Thumbnail value={`https://ipfs.io/ipfs/${thumbnailHash}`}/>
					}
					<InfoContainer>
						<div style={{flex: 1}}>
							<Label>About</Label>
							<Description>{description}</Description>

							<Label marginTop={50}>Transactions</Label>
							{
								this.props.LogFundTransfer.map((log) => {
									const args = log.args
									return (
										<ListItemContainer key={log.transactionHash}>
											<ListItem>From: {args.backer}</ListItem>
											<ListItem>ETH: {this.props.web3.fromWei(args.amount.toNumber(), 'ether')}</ListItem>
										</ListItemContainer>
									)
								})
							}
						</div>
						<div style={{
							flex: 0.7,
							marginLeft: 32
						}}>
							{
								this.isDeadlineReached &&
								<AppButton
									value="Withdraw"
									textAlign="center"
									onClick={this.props.onSafeWithdrawal}
								/>
							}


							<ProgressBar>
								<ProgressBar style={{width: this.getPledgedPercent + '%'}} bgColor={Colors.accent}/>
							</ProgressBar>
							<GroupText>
								<TextPrimary>ETH {this.props.amountRaised}</TextPrimary>
								<Text>pledged of ETH {fundingGoalInEthers ? fundingGoalInEthers.toNumber() : 0} goal</Text>
							</GroupText>

							<GroupText>
								<TextPrimary>{this.getPledgedPercent}%</TextPrimary>
								<Text>funded</Text>
							</GroupText>

							<GroupText>
								<TextPrimary>{this.props.totalContributors}</TextPrimary>
								<Text>backers</Text>
							</GroupText>

							<GroupText>
								<TextPrimary>{this.props.deadline}</TextPrimary>
								<Text>days to go</Text>
							</GroupText>

							{
								!this.isDeadlineReached &&
								<Fragment>
									<AppInput
										placeholder="Ex: 1"
										value={this.props.valueFund}
										onChange={this.props.onChangeText('valueFund')}
									/>
									<AppButton
										value="Back this project"
										textAlign="center"
										onClick={this.props.onFund}
									/>
								</Fragment>
							}

						</div>
					</InfoContainer>
				</Wrapper>
			</Container>
		)
	}
}

export default ProjectPage