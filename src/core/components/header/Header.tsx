import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Controller, DeepPartial, FieldValues, UnpackNestedValue, useForm } from 'react-hook-form';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { ROUTES } from '../../../shared/constants/routes';

import './Header.css';

export function Header() {
  const [t, i18n] = useTranslation();
  const { control, watch } = useForm<{ language: string }>({
    defaultValues: {
      language: i18n.language
    }
  });

  useEffect(() => {
    const subscription = watch(({ language }: UnpackNestedValue<DeepPartial<FieldValues>>) =>
      i18n.changeLanguage(language)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <header>
      <nav className="Header-nav">
        {
          ROUTES
            .filter(route => !route.hideInNav)
            .map(route =>
              <NavLink
                className="Header-nav-item"
                to={route.path}
                key={route.path}
                style={({ isActive }) => ({ color: isActive ? "red" : "" })}
              >
                {t(route.title)}
              </NavLink>
            )
        }
      </nav>

      <form className="Language-form">
        <FormControl fullWidth>
          <Controller
            name="language"
            control={control}
            rules={{required: true}}
            render={({ field }) => (
              <>
                <InputLabel id="Language-label">Language</InputLabel>
                <Select
                  labelId="Language-label"
                  label="Language"
                  {...field}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="ua">Українська</MenuItem>
                </Select>
              </>
            )}
          />
        </FormControl>
      </form>
    </header>
  );
}
