import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputFieldWrapper from "../commonComponents/InputFieldWrapper";
import Button from "../commonComponents/Button";
import LyricsDisplay from "../commonComponents/LyricsDisplay";
import { getLyrics } from "../../services/lyricsApi";
import { useTranslation } from "react-i18next";
import './Home.scss';

function Home() {
  const { t } = useTranslation();
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object({
    artist: Yup.string().required(t("errors.artist_required")),
    song: Yup.string().required(t("errors.song_required")),
  });

  return (
    <div className="home">
      <h1 className="home__title">{t('title')}</h1>
      <Formik
        initialValues={{ artist: "", song: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          try {
            const result = await getLyrics(values.artist, values.song);
            setLyrics(result);
          } finally {
            setLoading(false);
            setSubmitting(false);
          }
        }}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className="home__form">
            <InputFieldWrapper name="artist" placeholder="artist_placeholder" />
            <InputFieldWrapper name="song" placeholder="song_placeholder" />
            <Button
              type="submit"
              disabled={!isValid || !dirty || isSubmitting}
            >
              {t('search_button')}
            </Button>
          </Form>
        )}
      </Formik>
      <hr />
      <LyricsDisplay lyrics={lyrics} loading={loading} />
    </div>
  );
}

export default Home;
