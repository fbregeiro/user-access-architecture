import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

import css from './menuComponent.css';

export default function MenuComponent() {
	return (
		<UserContext.Consumer>
			{({ user }) => (
				<ol className={css['tree-list']}>
					{user &&
						user.userAccess &&
						user.userAccess.map(section => (
							<li key={section.sectionName}>
								<label htmlFor={section.sectionName}>
									{section.sectionName}
								</label>
								{section.sectionMenus.length > 0 && (
									<input
										id={section.sectionName}
										name={section.sectionName}
										type="checkbox"
									/>
								)}
								<ul>
									{section.sectionMenus.map(menu => (
										<li key={menu.menuName}>
											{menu.subMenus.length > 0 && (
												<label htmlFor={menu.menuName}>{menu.menuName}</label>
											)}
											{menu.subMenus.length === 0 && (
												<a key={menu.menuName}>{menu.menuName}</a>
											)}
											<input id={menu.menuName} type="checkbox" />
											<ul>
												{menu.subMenus.map(submenu => (
													<li key={submenu.subMenuName}>
														<NavLink to={submenu.route}>
															{submenu.subMenuName}
														</NavLink>
													</li>
												))}
											</ul>
										</li>
									))}
								</ul>
							</li>
						))}
				</ol>
			)}
		</UserContext.Consumer>
	);
}
