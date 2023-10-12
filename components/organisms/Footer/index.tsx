import Image from "next/image";
import Link from "next/link";
import React from "react";
import FooterItem from "../../molecules/FooterItem";

export default function Footer() {
	return (
		<section className="footer pt-50">
			<footer>
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-4 text-lg-start text-center">
							<Link href="/" className="mb-30">
								<Image src="/icon/logo.svg" alt="logo" width={60} height={60} />
							</Link>
							<p className="mt-30 text-lg color-palette-1 mb-30">
								StoreGG membantu gamers
								<br /> untuk menjadi pemenang sejati
							</p>
							<p className="mt-30 text-lg color-palette-1 mb-30">
								Copyright 2021. All Rights Reserved.
							</p>
						</div>
						<div className="col-lg-8 mt-lg-0 mt-20">
							<div className="row gap-sm-0">
								<div className="col-md-4 col-6 mb-lg-0 mb-25">
									<p className="text-lg fw-semibold color-palette-1 mb-12">
										Company
									</p>
									<ul className="list-unstyled">
										<FooterItem listItem="About Us" />
										<FooterItem listItem="Press Release" />
										<FooterItem listItem="Terms of Use" />
										<FooterItem listItem="Privacy & Policy" />
									</ul>
								</div>
								<div className="col-md-4 col-6 mb-lg-0 mb-25">
									<p className="text-lg fw-semibold color-palette-1 mb-12">
										Support
									</p>
									<ul className="list-unstyled">
										<FooterItem listItem="Refund Policy" />
										<FooterItem listItem="Unlock Rewards" />
										<FooterItem listItem="Live Chatting" />
									</ul>
								</div>
								<div className="col-md-4 col-12 mt-lg-0 mt-md-0 mt-25">
									<p className="text-lg fw-semibold color-palette-1 mb-12">
										Connect
									</p>
									<ul className="list-unstyled">
										<FooterItem listItem="hi@store.gg" />
										<FooterItem listItem="team@store.gg" />
										<FooterItem listItem="Pasific 12, Jakarta Selatan" />
										<FooterItem listItem="021 - 1122 - 9090" />
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</section>
	);
}
