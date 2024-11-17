import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const TabNavigation: React.FC = () => {
	const location = useLocation();
	const [tab, setTab] = useState(0);

	useEffect(() => setTab(location.pathname === '/notes' ? 1 : 0), [location]);

	return (
		<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
			<Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
				<Tab component={Link} to="/" label="Создать запись" />
				<Tab component={Link} to="/notes" label="Записи" />
			</Tabs>
		</Box>
	);
};

const CustomTabPanel: React.FC<PropsWithChildren> = (props) => {
	return (
		<div role="tabpanel">
			<Box sx={{ padding: 3 }}>{props.children}</Box>
		</div>
	);
}

export { TabNavigation, CustomTabPanel }