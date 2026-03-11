import { useState, useEffect } from 'react';

export interface SiteSettings {
  site_name: string;
  primary_color: string;
  bg_color: string;
  hero_title: string;
  hero_subtitle: string;
  hero_bg_url: string;
  seo_title: string;
  seo_description: string;
  company_phone: string;
  company_email: string;
  company_address: string;
  logo_url: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  service1_title: string;
  service1_desc: string;
  service1_img: string;
  service2_title: string;
  service2_desc: string;
  service2_img: string;
  service3_title: string;
  service3_desc: string;
  service3_img: string;
  [key: string]: string;
}

export interface Post {
  id: number;
  type: 'notice' | 'product' | 'portfolio';
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export interface User {
  username: string;
}
