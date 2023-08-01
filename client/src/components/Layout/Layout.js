import React from 'react';
import Header from './Header';
import Footer from './Footer';
//this is for seo in react not provide meta tag and layout me daale ge becoue saare page layout re rape kiye hai
import { Helmet } from 'react-helmet'
//this is container which contain whaere use post notification
//this is not work after registration post not give notification so changed
// import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast'

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />

                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />


                <title>{title}</title>

            </Helmet>

            <Header />
            <main style={{ minHeight: "70vh" }}>

                {/* <ToastContainer /> */}
                <Toaster />

                {/* this is for show child components */}
                {children}
            </main>
            <Footer />

        </div >
    )
};
Layout.defaultProbs = {
    title: "ecommerce app",
    description: "mern stack app",
    keywords: "mern,react,node,mongodb",
    author: "vicky jaiswal"

}

export default Layout
