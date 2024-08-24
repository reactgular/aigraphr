import {Center, Stack} from '@mantine/core';
import {MantineLogo} from '@mantinex/mantine-logo';
import {
    IconCalendarStats,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconGauge,
    IconHome2,
    IconLogout,
    IconSettings,
    IconSwitchHorizontal,
    IconUser
} from '@tabler/icons-react';
import {useState} from 'react';
import {UiNavbarLink} from './UiNavbarLink';

const DATA = [
    {icon: IconHome2, label: 'Home'},
    {icon: IconGauge, label: 'Dashboard'},
    {icon: IconDeviceDesktopAnalytics, label: 'Analytics'},
    {icon: IconCalendarStats, label: 'Releases'},
    {icon: IconUser, label: 'Account'},
    {icon: IconFingerprint, label: 'Security'},
    {icon: IconSettings, label: 'Settings'}
];

export const UiNavbarMinimal = () => {
    // TODO driven by active route
    const [active, setActive] = useState(0);

    return (
        <nav className="flex flex-col p-3 border-r">
            <Center>
                <MantineLogo type="mark" size={30} />
            </Center>

            <div className="flex mt-6">
                <Stack justify="center" gap={0}>
                    {DATA.map((link, index) => (
                        <UiNavbarLink
                            {...link}
                            key={link.label}
                            active={index === active}
                            onClick={() => setActive(index)}
                        />
                    ))}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                <UiNavbarLink
                    icon={IconSwitchHorizontal}
                    label="Change account"
                />
                <UiNavbarLink icon={IconLogout} label="Logout" />
            </Stack>
        </nav>
    );
};
