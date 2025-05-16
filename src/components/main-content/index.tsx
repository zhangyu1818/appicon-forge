import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import tw from 'tw-styled';
import i18n from 'i18next';
import { useEffect, useState } from 'react';

import { IconsGrid } from '@/components/icons-grid';
import { LanguageToggle } from '@/components/language-toggle';
import { PreviewDialog } from '@/components/preview-icon-dialog';
import { PreviewText } from '@/components/preview-text';
import { PreviewUpload } from '@/components/preview-upload';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store';
import { Settings, Tab } from '@/store/constants';

const MotionTabContent = tw(
  motion.div,
)`mt-4 flex-1 overflow-hidden ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`;

export function MainContent() {
  const { t } = useTranslation();
  const [{ selectedTab }, setComponentsState] = useStore(
    (store) => store.componentsState,
  );
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    const handleInitialized = () => {
      setUpdateKey(prevKey => prevKey + 1);
    };

    if (i18n.isInitialized) {
      setUpdateKey(prevKey => prevKey + 1);
    } else {
      i18n.on('initialized', handleInitialized);
    }

    return () => {
      i18n.off('initialized', handleInitialized);
    };
  }, []);

  return (
    <div key={updateKey} className='relative rounded-2xl border p-4 shadow-sm'>
      <Tabs
        className='flex h-full flex-col'
        value={selectedTab}
        onValueChange={(value) => {
          setComponentsState((draft) => {
            draft.selectedTab = value as Tab;
          });
          if (value === Tab.Icon || value === Tab.Upload) {
            setComponentsState((draft) => {
              draft.selectedSettings = Settings.Icon;
            });
          } else if (value === Tab.Text) {
            setComponentsState((draft) => {
              draft.selectedSettings = Settings.Text;
            });
          }
        }}
      >
        <div className='grid grid-cols-[1fr_auto_auto_auto] gap-4'>
          <TabsList className='justify-self-start'>
            <TabsTrigger value={Tab.Icon}>{t('tabs.icon')}</TabsTrigger>
            <TabsTrigger value={Tab.Text}>{t('tabs.text')}</TabsTrigger>
            <TabsTrigger value={Tab.Upload}>{t('tabs.upload')}</TabsTrigger>
          </TabsList>
          <Button asChild className='p-4' size='icon' variant='ghost'>
            <a
              href='https://github.com/zhangyu1818/appicon-forge'
              rel='noreferrer'
              target='_blank'
            >
              <Icon icon='octicon:mark-github-24' />
            </a>
          </Button>
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <AnimatePresence mode='wait'>
          {selectedTab === Tab.Icon && (
            <MotionTabContent
              key={Tab.Icon}
              animate={{ opacity: 1 }}
              className='flex-1 overflow-hidden'
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <IconsGrid />
            </MotionTabContent>
          )}

          {selectedTab === Tab.Text && (
            <MotionTabContent
              key={Tab.Text}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <PreviewText />
            </MotionTabContent>
          )}
          {selectedTab === Tab.Upload && (
            <MotionTabContent
              key={Tab.Upload}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <PreviewUpload />
            </MotionTabContent>
          )}
        </AnimatePresence>
      </Tabs>
      <PreviewDialog />
    </div>
  );
}
