
# source tests/test_package.sh

TEST_DIR=$PWD/.tmp/test
TEST_OUTPUT=$PWD/test.log

# Change file descriptors for redirecting stderr (2) and stdout (1).
# 7 is a new file descriptor for keeping a reference to the original setting.
exec 7>&1 1>$TEST_OUTPUT 2>&1
# Create a temporary consumming application for testing.
mkdir -p $TEST_DIR
rm -R $TEST_DIR/tests
cp -R $PWD/tests $TEST_DIR/tests
# Remove the existing package file.
rm $TEST_DIR/*.tgz
package_file_name=$(npm pack . --pack-destination $TEST_DIR)
python3 tests/transform_package_json.py < package.json > $TEST_DIR/package.json
cd $TEST_DIR
npm install ./$package_file_name
exec 1>&7 2>&1 7>&-
# Only the Node environment.
npm run testNode | tee -a $TEST_OUTPUT
cd $OLDPWD