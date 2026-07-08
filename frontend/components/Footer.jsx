//footer handle by sidra


export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 text-center sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-base font-semibold text-white">International Institute Of Language And Study Abroad</p>
          <p className="mt-2 text-sm text-slate-400">Professional guidance for study abroad, visas, and language exams.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-5 text-sm text-slate-400">
          <a href="https://www.linkedin.com/company/iilstudyabroad/" className="hover:text-white">LinkedIn</a>
          <a href="https://www.facebook.com/iiLstudyabroad" className="hover:text-white">Facebook</a>
          <a href="https://www.instagram.com/iil.studyabroad" className="hover:text-white">Instagram</a>
        </div>
      </div>
      <div className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
        © 2026 International Institute Of Language. All rights reserved.
      </div>
    </footer>
  );
}