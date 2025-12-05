
import React from 'react';
import SEO from '../components/SEO';
import { JOURNAL_ACRONYM } from '../constants';
import { Shield, Scale, Users, FileText, AlertTriangle, BookOpen } from 'lucide-react';

const Ethics: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title="Publication Ethics" 
        description={`Publication Ethics and Malpractice Statement for ${JOURNAL_ACRONYM}, based on COPE guidelines.`} 
      />

      {/* Header */}
      <div className="bg-polyBlue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">Publication Ethics</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Adhering to the highest standards of integrity, transparency, and academic rigor in accordance with COPE guidelines.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Intro Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-10">
           <div className="flex items-start gap-4">
              <Shield className="text-polyGold shrink-0" size={40} />
              <div>
                <h2 className="text-2xl font-bold text-polyBlue mb-3">General Statement</h2>
                <p className="text-gray-700 leading-relaxed">
                  The {JOURNAL_ACRONYM} is committed to maintaining the highest ethical standards for all parties involved in the act of publishing: the author, the journal editor, the peer reviewer, and the publisher. We do not tolerate plagiarism or other unethical behavior and will remove any manuscript that does not meet these standards.
                </p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Editors */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
             <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <Scale className="text-polyBlue" size={24} />
                <h3 className="text-xl font-bold text-gray-800">Duties of Editors</h3>
             </div>
             <ul className="space-y-4 text-gray-700 text-sm md:text-base">
                <li className="flex gap-3">
                   <span className="font-bold text-polyGold">•</span>
                   <span><strong>Fair Play:</strong> Manuscripts are evaluated for their intellectual content without regard to race, gender, sexual orientation, religious belief, ethnic origin, citizenship, or political philosophy of the authors.</span>
                </li>
                <li className="flex gap-3">
                   <span className="font-bold text-polyGold">•</span>
                   <span><strong>Confidentiality:</strong> The Editor and any editorial staff must not disclose any information about a submitted manuscript to anyone other than the corresponding author, reviewers, potential reviewers, and the publisher.</span>
                </li>
                <li className="flex gap-3">
                   <span className="font-bold text-polyGold">•</span>
                   <span><strong>Decision Making:</strong> The editors are responsible for deciding which of the articles submitted to the journal should be published based on the validation of the work in question and its importance to researchers and readers.</span>
                </li>
             </ul>
          </section>

          {/* Reviewers */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
             <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <Users className="text-polyBlue" size={24} />
                <h3 className="text-xl font-bold text-gray-800">Duties of Reviewers</h3>
             </div>
             <ul className="space-y-4 text-gray-700 text-sm md:text-base">
                <li className="flex gap-3">
                   <span className="font-bold text-polyGold">•</span>
                   <span><strong>Contribution:</strong> Peer review assists the editor in making editorial decisions and through the editorial communications with the author may also assist the author in improving the paper.</span>
                </li>
                <li className="flex gap-3">
                   <span className="font-bold text-polyGold">•</span>
                   <span><strong>Promptness:</strong> Any selected referee who feels unqualified to review the research reported in a manuscript or knows that its prompt review will be impossible should notify the editor and excuse himself from the review process.</span>
                </li>
                <li className="flex gap-3">
                   <span className="font-bold text-polyGold">•</span>
                   <span><strong>Objectivity:</strong> Reviews should be conducted objectively. Personal criticism of the author is inappropriate. Referees should express their views clearly with supporting arguments.</span>
                </li>
             </ul>
          </section>

          {/* Authors */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 md:col-span-2">
             <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <FileText className="text-polyBlue" size={24} />
                <h3 className="text-xl font-bold text-gray-800">Duties of Authors</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <ul className="space-y-4 text-gray-700 text-sm md:text-base">
                  <li className="flex gap-3">
                     <span className="font-bold text-polyGold">•</span>
                     <span><strong>Reporting Standards:</strong> Authors of reports of original research should present an accurate account of the work performed as well as an objective discussion of its significance.</span>
                  </li>
                  <li className="flex gap-3">
                     <span className="font-bold text-polyGold">•</span>
                     <span><strong>Originality and Plagiarism:</strong> The authors should ensure that they have written entirely original works, and if the authors have used the work and/or words of others, that this has been appropriately cited or quoted.</span>
                  </li>
               </ul>
               <ul className="space-y-4 text-gray-700 text-sm md:text-base">
                  <li className="flex gap-3">
                     <span className="font-bold text-polyGold">•</span>
                     <span><strong>Multiple Publication:</strong> An author should not in general publish manuscripts describing essentially the same research in more than one journal or primary publication.</span>
                  </li>
                  <li className="flex gap-3">
                     <span className="font-bold text-polyGold">•</span>
                     <span><strong>Authorship:</strong> Authorship should be limited to those who have made a significant contribution to the conception, design, execution, or interpretation of the reported study.</span>
                  </li>
               </ul>
             </div>
          </section>

          {/* Malpractice & Policies */}
          <section className="bg-red-50 rounded-xl shadow-sm border border-red-100 p-6 md:p-8 md:col-span-2">
             <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-600" size={24} />
                <h3 className="text-xl font-bold text-red-800">Dealing with Unethical Behavior</h3>
             </div>
             <p className="text-gray-700 mb-4 leading-relaxed">
               Misconduct and unethical behavior may be identified and brought to the attention of the editor and publisher at any time, by anyone.
               Ethical violations include, but are not limited to: plagiarism, data fabrication, and redundant publication.
             </p>
             <p className="text-gray-700 font-bold">Procedures for dealing with unethical behavior:</p>
             <ol className="list-decimal list-inside space-y-2 mt-2 text-gray-700 ml-2">
                <li>Initial inquiry by the Editor.</li>
                <li>Gathering of evidence while maintaining confidentiality.</li>
                <li>Opportunity for the author to respond to allegations.</li>
                <li>Formal retraction or correction notice if misconduct is confirmed.</li>
                <li>Potential ban on future submissions from the author.</li>
             </ol>
          </section>

        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-500 flex flex-col items-center">
           <BookOpen size={24} className="mb-2 text-gray-400" />
           <p>These guidelines are based on the Committee on Publication Ethics (COPE) Best Practice Guidelines for Journal Editors.</p>
        </div>
      </div>
    </div>
  );
};

export default Ethics;
