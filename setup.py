""" Setup GPages package
"""
import os

import setuptools


def read(fname: str):
    """Helper function to read files"""
    return open(
        os.path.join(os.path.dirname(__file__), fname), "r", encoding="utf-8"
    ).read()


setuptools.setup(
    name="GPages",
    version="0.0.1",
    description="A static website generator",
    long_description=read("README.md"),
    long_description_content_type="text/markdown",
    keywords="web",
    package_dir={"": "src"},
    packages=setuptools.find_packages(where="src", exclude=["tests", "tests.*"]),
    install_requires=[],
    entry_points={"console_scripts": ["gpages=gpages.main:main"]},
)